import Notiflix from "notiflix";

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldResolve = Math.random() > 0.3;
            if(shouldResolve){
                resolve({position, delay });
            } else{
                reject({ position, delay });
            }
        }, delay);
    });
}

document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

    const delayInput = this.elements.delay;
    const stepInput = this.elements.step;
    const amountInput = this.elements.amount;

    const delay = Number(delayInput.value);
    const step = Number(stepInput.value);
    const amount = Number(amountInput.value);

    for(let i = 0; i < amount; i++) {
        const position = i + 1;
        const promise = createPromise(position, delay + i * step);

        promise
            .then(({ position, delay }) => {
                Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });
    }
    
    this.reset();
});