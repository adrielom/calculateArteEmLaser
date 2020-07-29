const AddValue = (quant: any, setQuant: any, TOP_THRESHOLD: number) => {
    if (quant + 1 <= TOP_THRESHOLD)
        setQuant(quant + 1);

}
const SubValue = (quant: any, setQuant: any, BOTTOM_THRESHOLD: number) => {
    if (quant - 1 >= BOTTOM_THRESHOLD)
        setQuant(quant - 1);
}

const timerFunc = (func1: Function, func2: Function) => {
    func1()
    func2()
}

export {
    AddValue, SubValue, timerFunc
}