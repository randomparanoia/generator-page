export default class Utils {
  static gridBuilder(id: string, data: any) {
    const gridContainer = document.getElementById(id);
    if (gridContainer !== null) {
      gridContainer.innerHTML = '';
      data.forEach((element: any) => {
        element.forEach((letter: any) => {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.textContent = letter;
          gridContainer.appendChild(cell);
        });
      });
    }
  }
}
