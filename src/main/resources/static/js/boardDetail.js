console.log("boardDetail.js in!!");

document.getElementById('listBtn').addEventListener('click', () => {
    // 리스트로 이동
    location.href="/board/list";
});

document.getElementById('modBtn').addEventListener('click', ()=>{
// title, content의 readonly를 해지 readOnly = true / false
    document.getElementById('title').readOnly = false;
    document.getElementById('content').readOnly = false;

    // modBtn delBtn 삭제
    document.getElementById('modBtn').remove();
    document.getElementById('delBtn').remove();

    // modBtn => submit
    // <button></button>
    let modBtn = document.createElement('button');
    // <button type="submit"></button> 
    modBtn.setAttribute('type','submit'); 
    modBtn.setAttribute('id','regBtn'); 
    // class="btn btn-warning"
    modBtn.classList.add('btn','btn-outline-warning');
    // <button type="submit" class="btn btn-outline-warning">submit</button>
    modBtn.innerText="submit";

    // form 태그의 자식 요소로 추가 - form에 가장 마지막에 추가
    document.getElementById('modForm').appendChild(modBtn);

    // file-x 버튼 disabled 해지
    let fileDelBtn = document.querySelectorAll(".file-x");
    console.log(fileDelBtn);
    for(let delBtn of fileDelBtn){
        delBtn.disabled = false;
    }

    // 파일 업로드 버튼 disabled 해지
    document.getElementById('trigger').disabled = false;

});

document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('file-x')){
        console.log(e.target);
        let uuid = e.target.dataset.uuid;
        fileRemoveToServer(uuid).then(result => {
            if(result > 0){
                alert("파일 삭제 성공");
                e.target.closest('li').remove();
            }
        })
    }
});

// 비동기 데이터 보내기
async function fileRemoveToServer(uuid) {
    try{
        const url = '/board/file/'+uuid;
        const config = {
            method:"delete"
        }
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    }catch(error){
        console.log(error);
    }
}