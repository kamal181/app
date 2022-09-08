class CustomCellRenderer {
    init(params) {
        this.eGui = document.createElement('div');
        this.eGui.classList.add("d-flex", "justify-content-between", "mr-3");
        this.eGui.innerHTML =
            /* html */
            `<div>${params.value}</div>`;

        // creates the row dragger element
        var rowDragger = document.createElement('div');
        rowDragger.innerHTML = `<img width="24" src="/icon/equal_math_sign_icon.svg" className="equal-icon" alt="image" />`;

        this.eGui.appendChild(rowDragger);

        // registers as a row dragger
        params.registerRowDragger(rowDragger);
    }

    getGui() {
        return this.eGui;
    }

    refresh(params) {
        return false;
    }
}
export default CustomCellRenderer;