//@flow strict
export default function dummy(e: Event): void {
  if (e.target instanceof HTMLButtonElement) {
    e.target.innerText = 'Changed in flow module';
  } else {
    throw new Error('Is supposed to be a button element click handler');
  }
  console.log('Clicked in flow module');
}
