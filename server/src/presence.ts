type PresenceSocket = {
  send(data: unknown): void;
}

type ConnectionMap = Map<string, PresenceSocket>;

const onlineUsers = new Map<string, ConnectionMap>();

function add(userId: string, connectionId: string, ws: PresenceSocket) {
  const connections = onlineUsers.get(userId) || new Map<string, PresenceSocket>();
  connections.set(connectionId, ws);
  onlineUsers.set(userId, connections);
}

function remove(userId: string, connectionId: string) {
  const connections = onlineUsers.get(userId);
  if (connections) {
    connections.delete(connectionId);
    if (connections.size === 0) {
      onlineUsers.delete(userId);
    }
  }
}

export const presence = { add, remove };