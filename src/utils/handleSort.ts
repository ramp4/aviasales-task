export function handleSort(cheap: boolean, some: string) {
  const makeDeselectOther = (cheap: boolean, some: string) => {
    if (some === "fast") {
      cheap = false;
      const otherEl = document.querySelector(`#cheap`);
      otherEl?.classList.toggle("selected");
    } else {
      cheap = true;
      const otherEl = document.querySelector(`#fast`);
      otherEl?.classList.toggle("selected");
    }
  };

  let prevSome = "cheap";
  if (cheap === false) {
    prevSome = "fast";
  }

  if (prevSome !== some) {
    const someEl = document.querySelector(`#${some}`);
    someEl?.classList.toggle("selected");
    makeDeselectOther(cheap, some);
    cheap = !cheap;
  }

  return cheap;
}
