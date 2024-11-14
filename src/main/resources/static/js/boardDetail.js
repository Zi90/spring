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
    // class="btn btn-warning"
    modBtn.classList.add('btn','btn-outline-warning');
    // <button type="submit" class="btn btn-outline-warning">submit</button>
    modBtn.innerText="submit";

    // form 태그의 자식 요소로 추가 - form에 가장 마지막에 추가
    document.getElementById('modForm').appendChild(modBtn);

});