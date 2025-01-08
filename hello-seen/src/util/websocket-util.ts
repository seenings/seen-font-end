export class WebsocketUtil {
  static isClosed(socket: WebSocket): boolean {
    return socket == null || socket.readyState !== 1;
  }

  static isOpened(socket: WebSocket): boolean {
    return !this.isClosed(socket);
  }

  static newSocket(url: string): WebSocket {
    let socketUrl = url;
    socketUrl = socketUrl.replace("https", "wss").replace("http", "ws");
    return new WebSocket(socketUrl);
  }

  static createSocket(
    webSocket: WebSocket,
    url: string,
    getMessage: (msg: string) => void,
  ) {
    //socket连接还存在时则不打开
    const socket = webSocket;
    //打开事件
    socket.onopen = function () {
      console.log("websocket已打开");
    };
    //获得消息事件
    socket.onmessage = function (msg) {
      console.log("获得消息", JSON.stringify(msg));
      getMessage(msg.data);
      //发现消息进入    开始处理前端触发逻辑
    };
    //关闭事件
    socket.onclose = function (ev: CloseEvent) {
      console.log("websocket已关闭", ev);
    };
    //发生了错误事件
    socket.onerror = function (ev: Event) {
      console.log("websocket发生了错误", ev);
    };
    return socket;
  }
}
