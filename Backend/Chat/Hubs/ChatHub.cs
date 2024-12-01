
using System.Data.Common;
using System.Text.Json;
using Chat.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Distributed;

namespace Chat.Hubs;

public interface IChatClient 
{
    public Task ReceiveMessage(string userName, string message);
}

public class ChatHub : Hub<IChatClient>
{
    private readonly IDistributedCache _cache;
    public ChatHub(IDistributedCache cache)
    {
        _cache = cache;
    }
   public async Task JoinChat(UserConnection connection)
   {
    await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

    var stringConnection = JsonSerializer.Serialize(connection);

    await _cache.SetStringAsync(Context.ConnectionId, stringConnection);

    await Clients.Group(connection.ChatRoom)
        .ReceiveMessage("Admin", $"{connection.UserName} has joined the chat");
   }
   
   public async Task SendMessage(string message)
{
    try
    {
        var stringConnection = await _cache.GetAsync(Context.ConnectionId);
        if (stringConnection == null)
        {
            Console.WriteLine($"No connection data found in cache for {Context.ConnectionId}");
            return;
        }
        var connection = JsonSerializer.Deserialize<UserConnection>(stringConnection);
        if (connection == null)
        {
            Console.WriteLine($"Failed to deserialize connection for {Context.ConnectionId}");
            return;
        }
        await Clients.Group(connection.ChatRoom)
            .ReceiveMessage(connection.UserName, message);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error while sending message: {ex.Message}");
    }
}


   public override async Task OnDisconnectedAsync(Exception? exception)
   {
    var stringConnection = await _cache.GetAsync(Context.ConnectionId);
    var connection = JsonSerializer.Deserialize<UserConnection>(stringConnection);
   
       if (connection is not null)
       {
         await _cache.RemoveAsync(Context.ConnectionId);
         await Groups.RemoveFromGroupAsync(Context.ConnectionId,connection.ChatRoom);
         
         await Clients
           .Group(connection.ChatRoom)
           .ReceiveMessage("Admin", $"{connection.UserName} has left the chat");
       }

    await base.OnDisconnectedAsync(exception);

   }
}