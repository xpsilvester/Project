let page = {
    selectBtn: document.getElementById('j_multi_select'),
    approBtn: document.getElementById('j_approve_group'),
    covers: document.getElementsByClassName('j-cover'),
    checks: document.getElementsByClassName('j-check'),
    checkbox: document.getElementsByClassName('j-identity'),
    card: document.getElementsByClassName('j-card'),
    maniBtn: document.getElementsByClassName('j-mani-btn'),
    checkboxInput: document.getElementsByClassName('j-option'),
    selectAll: document.getElementById('j_select_all')
}

window.onload = function () {
    
    // 绑定事件：点击多选
    page.selectBtn.addEventListener('click',function(){
        if(!hasClass(this, 'active')){
            addClass(this, 'active');
            addClass(page.approBtn, 'approve-btn-display');
            [].forEach.call(page.covers, function(item, i){
                addClass(item, 'cover-display');
            });
            [].forEach.call(page.checkbox, function(item, i){
                addClass(item, 'change-status-display');
            });
        } else {
            removeClass(this, 'active');
            removeClass(page.approBtn, 'approve-btn-display');
            [].forEach.call(page.covers, function(item, i){
                removeClass(item, 'cover-display');
            });
            [].forEach.call(page.checks, function(item, i){
                item.className.baseVal = item.className.baseVal.replace( new RegExp( '(\\s|^)check-green(\\s|$)' ),'' );
            });
            [].forEach.call(page.checkbox, function(item, i){
                removeClass(item, 'change-status-display'); 
            });
            [].forEach.call(page.checkboxInput, function(item, i){
                item.checked = false;
            })
        }
    });

    // 绑定事件：选择照片
    [].forEach.call(page.covers, function(item, index){
        item.addEventListener('click', function(){
            let check = this.getElementsByClassName('j-check')[0];
            if (!check) return;
            if(!check.className.baseVal.match( new RegExp( '(\\s|^)check-green(\\s|$)'))){
                check.className.baseVal += ' ' + 'check-green';
            } else {
                check.className.baseVal = check.className.baseVal.replace( new RegExp( '(\\s|^)check-green(\\s|$)' ),'' );
            }
        })
    });

    // 修改照片状态为合格/不合格/未审核 & 修改用户群组为管理员/普通用户/黑名单
    [].forEach.call(page.maniBtn, function(item, index){
        item.addEventListener('click', function(){
            let type = parseInt(this.children[0].dataset.id);
            if(hasClass(page.selectBtn, 'active')){
                let _check = document.getElementsByClassName('check-green');
                let _input = [].filter.call(page.checkboxInput, function(item){
                    return item.checked;
                });
                let checked = _check.length > 0 ? _check : _input;
                
                [].forEach.call(checked, function(item, i){
                    let _data = item.parentNode.parentNode.dataset.id;
                    send('PUT', {type: type}, '/' + window.location.pathname.split('/')[1] + '/' + _data, function(){
                        window.location.reload()
                    });
                });
            } else {
                let _data = item.parentNode.parentNode.dataset.id;
                send('PUT', {type: type}, '/' + window.location.pathname.split('/')[1] + '/' + _data, window.location.reload());
            }
        })
    })

    // 全选/取消
    page.selectAll && page.selectAll.addEventListener('click',function(){
        if(!hasClass(this, 'active')){
            addClass(this, 'active');
            [].forEach.call(page.checks, function(item, i){
                item.className.baseVal += ' ' + 'check-green';
            });
        } else {
            removeClass(this, 'active');
            [].forEach.call(page.checks, function(item, i){
                item.className.baseVal = item.className.baseVal.replace( new RegExp( '(\\s|^)check-green(\\s|$)' ),'' );
            });
        }
    })
}