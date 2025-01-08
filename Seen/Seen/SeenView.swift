//
//  SeenView.swift
//  Seen
//
//  Created by 池雪辉 on 2022/10/4.
//

import SwiftUI

import WebKit
struct SWKWebView: UIViewRepresentable {
    
    @Binding var url: String?
    
    func makeUIView(context: Context) -> WKWebView {
        let webview = WKWebView()
        webview.navigationDelegate = context.coordinator
        return webview
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) {
        if let url = url, let requetURL = URL(string: url)  {
            uiView.load(URLRequest(url: requetURL))
        }
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator()
    }
        
    class Coordinator: NSObject,WKNavigationDelegate {
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            webView.evaluateJavaScript("document.title") { (result, error) in
                print("didFinish:\(String(describing: result ?? ""))")
            }
        }
        func webView(_ webView: WKWebView, didReceive challenge: URLAuthenticationChallenge, completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
          let cred = URLCredential.init(trust: challenge.protectionSpace.serverTrust!)
          completionHandler(.useCredential, cred)
        }
    }
}

struct SeenView: View {
    @State var url: String? = "http://120.77.242.241/"
    var body: some View {
        SWKWebView(url: $url)
    }
}

struct SeenView_Previews: PreviewProvider {
    static var previews: some View {
        SeenView()
    }
}
