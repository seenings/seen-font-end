import {type FunctionalComponent, ref} from "vue";

const App: FunctionalComponent = () => {

    const photoUrl =
        "http://localhost:8101/seen/rest-v1/file/file-content/photo-id-to-resource-by-cache/130"
    const imgSrc = ref<string>('');
    return (
        <>
            <button>{'点击'}</button>
            <button onClick={() => {
                alert('点击了按钮2')
            }}>{'按钮2'}</button>
            <button onClick={() => {
                imgSrc.value = photoUrl;
            }}>下载图片
            </button>
            <img src={imgSrc.value} alt={'图片1'}></img>
            <img src={photoUrl} alt={'图片2'}></img>
            <img
                src={'http://localhost:8101/seen/rest-v1/file/file-content/photo-id-to-resources-by-compress?photoId=130'}
                alt={'图片3'}></img>
            <img src={'http://localhost:8101/seen/rest-v1/file/file-content/photo-id-to-resources?photoId=130'}
                 alt={'图片4'}></img>
        </>
    )
}

export default App