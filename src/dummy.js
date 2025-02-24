//@flow strict
export default function dummy(e: Event): void {
  if (e.target instanceof HTMLButtonElement) {
    e.target.innerText = 'Changed in flow module';
  } else {
    console.log('Clicked in flow module');
  }
}
