//
//  ContentView.swift
//  Seen
//
//  Created by 池雪辉 on 2022/10/4.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundColor(.accentColor)
            Text("Hello, 转眼觅见")
            Text("深圳市松弛科技有限公司版权所有。")
        }
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
