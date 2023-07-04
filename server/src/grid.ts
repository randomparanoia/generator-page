class Grid {
  public constructor(private char: string, private charWeight: number = 20) {}

  /**
   * define 10*10 grid Array with our random values
   * if character is given 20% of values will be populated on our grid array
   * @returns
   */
  generate() {
    const grid = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(this.getRandomCharacter());
      }
      grid.push(row);
    }

    // Validate char is present if so count occurrences an populate our grid with extra characters of the given character
    if (this.char !== "") {
      const totalOccurrences = 10 * 10;
      const targetOccurrences = Math.floor(
        totalOccurrences * (this.charWeight / 100)
      );

      let currentOccurrences = 0;

      while (currentOccurrences < targetOccurrences) {
        const rowIndex = Math.floor(Math.random() * 10);
        const colIndex = Math.floor(Math.random() * 10);

        if (grid[rowIndex][colIndex] !== this.char) {
          grid[rowIndex][colIndex] = this.char;
          currentOccurrences++;
        }
      }
    }

    return grid;
  }

  /**
   * calculate our code based on the seconds of the System Host time
   * @param grid
   * @returns
   */
  calculateCode(grid: any) {
    const date = new Date();
    const seconds = ("0" + date.getSeconds()).slice(-2).split("");
    const char1 = grid[seconds[0]][seconds[1]];
    const char2 = grid[seconds[1]][seconds[0]];
    let countChar1 = this.charOccurrences(char1, grid);
    let countChar2 = this.charOccurrences(char2, grid);

    countChar1 = countChar1 > 9 ? Math.floor(countChar1 / 9) : countChar1;
    countChar2 = countChar2 > 9 ? Math.floor(countChar1 / 9) : countChar2;

    return `${countChar1}${countChar2}`;
  }

  /**
   *  char occurrences [x;y] coordinates style
   */
  private charOccurrences(char: any, grid: any) {
    let occurrences = 0;

    for (let x = 0; x < grid.length; x++) {
      for (let z = 0; z < grid[x].length; z++) {
        if (grid[x][z] === char) {
          occurrences++;
        }
      }
    }

    return occurrences;
  }

  /**
   * Pre defined character weight is 20%
   * @returns
   */
  private getRandomCharacter() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const rndIndex = Math.floor(Math.random() * letters.length);

    return letters[rndIndex];
  }
}

export default Grid;
