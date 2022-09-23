import axios from 'axios';
// import { filterEmpty } from './index.js'

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000
});
// 空参数过滤
function filterEmpty (data) {
    if (!data) return ''
    const obj = {}
    Object.keys(data).forEach(key=>{
        if(data[key] !==""){
            obj[key] = data[key]
        }
    })
    return obj
}

service.interceptors.request.use(
    config => {
        config.headers['token'] = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzMjY1NyIsInN1YiI6IntcImxpc3RNZW51XCI6W3tcIm1lbnVQYXRoXCI6XCIvdXNlci9pbmRleC5odG1sXCIsXCJpY29uXCI6XCIuL2ljb25zL3loenQucG5nXCIsXCJlZGl0SWRcIjoyLFwibWVudU5hbWVcIjpcIueUqOaIt-S4reWPsFwiLFwiZWRpdFRpbWVcIjoxNjQyNzA0NDQwMDAwLFwic29ydFwiOjYsXCJ0eXBlXCI6XCIwXCIsXCJyZWxhdGlvblNoaXBcIjpcIjBcIixcInBhcmVudElkXCI6MCxcIl9wYWdlU2l6ZVwiOjAsXCJfcGFnZU51bVwiOjAsXCJ1c2VGbGFnXCI6XCIxXCIsXCJjcmVhdGVJZFwiOjIsXCJpZFwiOjF9LHtcImNsaWVudElkXCI6XCJMQ0tTWENcIixcIm1lbnVQYXRoXCI6XCIvbG9naW4vaW5kZXguaHRtbCMvY3Jvc3NBcmVhL3JlY2VpdmVMaXN0XCIsXCJpY29uXCI6XCIuL2ljb25zL2tzcXhjLnBuZ1wiLFwiZWRpdElkXCI6MixcIm1lbnVOYW1lXCI6XCLot6jnnIHljY_mn6XnrqHnkIZcIixcImVkaXRUaW1lXCI6MTY1MTE0MjIzODAwMCxcInNvcnRcIjoxLFwidHlwZVwiOlwiMFwiLFwicmVsYXRpb25TaGlwXCI6XCIwXCIsXCJwYXJlbnRJZFwiOjAsXCJfcGFnZVNpemVcIjowLFwiX3BhZ2VOdW1cIjowLFwidXNlRmxhZ1wiOlwiMVwiLFwiY3JlYXRlSWRcIjoyLFwiaWRcIjoxMX0se1wibWVudVBhdGhcIjpcIi9sb2dpbi9pbmRleC5odG1sIy9xdWFyYW50aW5lL2xpc3RcIixcImljb25cIjpcIi4vaWNvbnMvZ2xkZ2wucG5nXCIsXCJlZGl0SWRcIjoyLFwibWVudU5hbWVcIjpcIumalOemu-eCueeuoeeQhlwiLFwiZWRpdFRpbWVcIjoxNjQ5MjQ3MTQ1MDAwLFwic29ydFwiOjUsXCJ0eXBlXCI6XCIwXCIsXCJyZWxhdGlvblNoaXBcIjpcIjBcIixcInBhcmVudElkXCI6MCxcIl9wYWdlU2l6ZVwiOjAsXCJfcGFnZU51bVwiOjAsXCJ1c2VGbGFnXCI6XCIxXCIsXCJjcmVhdGVUaW1lXCI6MTYzOTIwNTYwNTAwMCxcImNyZWF0ZUlkXCI6MixcImlkXCI6NzB9LHtcIm1lbnVQYXRoXCI6XCIvbG9naW4vaW5kZXguaHRtbCMvcmVnaW9uYWwvdGFza19saXN0XCIsXCJpY29uXCI6XCIuL2ljb25zL3F5eGMucG5nXCIsXCJlZGl0SWRcIjoyLFwibWVudU5hbWVcIjpcIuWMuuWfn-WNj-afpeeuoeeQhlwiLFwiZWRpdFRpbWVcIjoxNjQ5NjQzNTg4MDAwLFwic29ydFwiOjYsXCJ0eXBlXCI6XCIxXCIsXCJyZWxhdGlvblNoaXBcIjpcIjBcIixcInBhcmVudElkXCI6MCxcIl9wYWdlU2l6ZVwiOjAsXCJfcGFnZU51bVwiOjAsXCJ1c2VGbGFnXCI6XCIxXCIsXCJjcmVhdGVUaW1lXCI6MTYzOTM4MTIyNjAwMCxcImNyZWF0ZUlkXCI6MixcImlkXCI6NzN9LHtcIm1lbnVQYXRoXCI6XCIvZGFzaGJvYXJkL2luZGV4Lmh0bWwjL2Rhc2hib2FyZFwiLFwiaWNvblwiOlwiLi9pY29ucy9rc2gucG5nXCIsXCJlZGl0SWRcIjozMjY1NyxcIm1lbnVOYW1lXCI6XCLnlqvmg4Xlj6_op4bljJZcIixcImVkaXRUaW1lXCI6MTY1NTc5OTA2MTAwMCxcInNvcnRcIjowLFwidHlwZVwiOlwiMFwiLFwicmVsYXRpb25TaGlwXCI6XCIwXCIsXCJwYXJlbnRJZFwiOjAsXCJfcGFnZVNpemVcIjowLFwiX3BhZ2VOdW1cIjowLFwidXNlRmxhZ1wiOlwiMVwiLFwiY3JlYXRlVGltZVwiOjE2NDE0NDYxNDkwMDAsXCJjcmVhdGVJZFwiOjIsXCJpZFwiOjEyNH0se1wiY2xpZW50SWRcIjpcIllKWkNcIixcIm1lbnVQYXRoXCI6XCIveXFma3dlYi9pbmRleC5odG1sIy95anpjXCIsXCJpY29uXCI6XCIuL2ljb25zL3lqemMucG5nXCIsXCJtZW51TmFtZVwiOlwi5LiA6ZSu55u05p-lXCIsXCJlZGl0VGltZVwiOjE2NTE3NDE2NzcwMDAsXCJzb3J0XCI6NCxcInR5cGVcIjpcIjBcIixcInJlbGF0aW9uU2hpcFwiOlwiMFwiLFwicGFyZW50SWRcIjowLFwiX3BhZ2VTaXplXCI6MCxcIl9wYWdlTnVtXCI6MCxcInVzZUZsYWdcIjpcIjFcIixcImNyZWF0ZVRpbWVcIjoxNjQxNDQ2NDg4MDAwLFwiY3JlYXRlSWRcIjoyLFwiaWRcIjoxMjV9LHtcIm1lbnVQYXRoXCI6XCIvbG9naW4vaW5kZXguaHRtbCMvY2xvc2Vjb250YWN0L3BlcnNvbmxpc3RcIixcImljb25cIjpcIi4vaWNvbnMvY21qcnkucG5nXCIsXCJlZGl0SWRcIjozMjY1NyxcIm1lbnVOYW1lXCI6XCLlr4bmjqXmrKHlr4bmjqXnrqHnkIZcIixcImVkaXRUaW1lXCI6MTY1NTgwMDEyNDAwMCxcInNvcnRcIjoyLFwidHlwZVwiOlwiMFwiLFwicmVsYXRpb25TaGlwXCI6XCIwXCIsXCJwYXJlbnRJZFwiOjAsXCJfcGFnZVNpemVcIjowLFwiX3BhZ2VOdW1cIjowLFwidXNlRmxhZ1wiOlwiMVwiLFwiY3JlYXRlVGltZVwiOjE2NDI3NTEzMjcwMDAsXCJjcmVhdGVJZFwiOjIsXCJpZFwiOjEyN31dLFwidXNlcklkXCI6MzI2NTcsXCJhcmVhTm9cIjpcIjUxMDAwMDAwMDAwMFwiLFwibmFtZVwiOlwi6Zm254Gr55SfXCIsXCJhZXNLZXlcIjpcImpkZ0p6TGhUQW5uTmwwdjBUSUJpSDlkdmo4bTZXYWF2XCJ9IiwiaXNzIjoidXNlciIsImlhdCI6MTY1Nzg3NjQwOSwiZXhwIjoxNjU3ODc4MjA5fQ.fxTj1bvJjMYVYWs5ELw6P9EKrNv4Up-ydE_dXZiE1lc'
        if (config.method === 'get') {
            // 过滤空字符串
            config.params = filterEmpty(config.params)
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
