const keyGenerator = (pre = 'item') => {
    let counter = 0;

    return () => {
        const key = `${pre}_${counter}`;
        counter++;

        return key;
    };
}

export default keyGenerator;