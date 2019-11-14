let index = 0;

function dialog() {
    let attr = "data-u-dialog";
    this.getUid = () => (+new Date() + ++index).toString(32);
    const isUndefined = value => typeof value === "undefined";
    this.open = (options = {}) => {
        if (isUndefined(options.showShadow)) options.showShadow = true;
        if (isUndefined(options.shadowClose)) options.shadowClose = true;
        if (isUndefined(options.showClose)) options.showClose = false;
        const id = this.getUid();
        let maskEl = document.createElement('div');
        maskEl.className = "u-dialog-mask " + (options.showShadow ? "" : "is-hide");
        if(options.showShadow < 1 &&  options.showShadow > 0)maskEl.style.opacity = options.showShadow;
        maskEl.setAttribute('data-u-dialog', id);
        let el = document.createElement('div');
        el.className = "u-dialog " + (options.className || '');
        el.setAttribute('data-u-dialog', id);
        el.innerHTML = `
            <div class="u-dialog-content"
                style="width:${options.width ? (options.width + 'px') : '910px'};height:${options.height ? (options.height + 'px') : 'auto'};">
                <div class="u-dialog-title ${options.title ? 'is-show' : ''}">${options.title || ''}</div>
                <div class="u-dialog-body">${options.content || ''}</div>
                <div class="u-dialog-close ${options.showClose ? 'is-show' : ''}"x</div>
            </div> `;
        document.body.appendChild(maskEl);
        document.body.appendChild(el);
        // position
        let top = Math.max((window.innerHeight - el.clientHeight) / 2, 0);
        let left = Math.max((window.innerWidth - el.clientWidth) / 2, 0);
        el.style.top = top + 'px';
        el.style.left = left + 'px';
        el.classList.add("is-show");
        // event
        if (options.shadowClose) maskEl.onclick = () => this.hideToast(maskEl.getAttribute(attr));
        if (options.showClose) el.querySelector('.u-dialog-close').onclick = () => this.hideToast(el.getAttribute(attr));
        if (options.time) setTimeout(() => this.hideToast(el.getAttribute(attr)), options.time * 1e3)
        return id
    }
    this.hideToast = id => {
        function remove(el) {
            el.classList.remove('is-show');
            setTimeout(() => {
                let parent = el.parentNode;
                if (parent) parent.removeChild(el)
            }, 100)
        }
        Array.prototype.forEach.call(document.querySelectorAll(`[${attr}]`), el => {
            id ? (id == el.getAttribute(attr) && remove(el)) : remove(el)
        });
    }
    this.toast = (content, time = 2) => {
        this.hideToast();
        return this.open({
            className: 'u-dialog__toast',
            content,
            width: 'auto',
            showShadow: false,
            shadowClose: false,
            time
        })
    }
    this.showLoading = (content) => {
        let el = document.querySelector(".u-dialog__loading");
        if (!el) {
            this.hideToast();
            return this.open({
                className: 'u-dialog__loading',
                content: `<i></i><p>${content || ''}</p>`,
                width: 120,
                height: 120,
                showShadow: 0.3,
                shadowClose: false
            })
        } else {
            el.querySelector('p').innerHTML = content;
            return el.getAttribute(attr)
        }
    }
    this.showSuccess = (content, time = 2) => {
        this.hideToast();
        return this.open({
            className: 'u-dialog__success',
            content: `<i></i><p>${content || ''}</p>`,
            width: 120,
            height: 120,
            showShadow: false,
            shadowClose: false,
            time
        })
    }
    this.showError = (content, time = 5) => {
        this.hideToast();
        return this.open({
            className: 'u-dialog__error',
            content: `<i></i><p>${content || ''}</p>`,
            width: 320,
            height: 240,
            shadowClose: true,
            showClose: true
        })

    }
}

export default new dialog()