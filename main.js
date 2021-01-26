// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Exersize starts here:

// Factory function which creates specimen of the organism as object
function pAequorFactory(number, array) {
  return {
    specimenNum: number,
    dna: array,

    // Mutate function selects a random DNA base and changes it's value to a different/mutated DNA base from 4 available types
    mutate () {
      let randomPropNum = Math.floor(Math.random() * 15);
      let propertyToChange = this.dna[randomPropNum];
      
      // FOR loop checks if the randomly selected DNA base in the speciment to is different from the substitution DNA base.
      // If the substitution DNA base is different, the specimen takes it as a new value/
      for(let i = 0; i < 4; i++) {
        let dnaBase = returnRandBase();
        if(dnaBase !== propertyToChange) {
          this.dna[randomPropNum] = dnaBase;
          break;
        };
      };
      
     return this.dna;
      
    },

    // Function to compare the current organism's DNA to another one. Function saves the common DNA bases in an array 
    // and returns the percentage of identical DNA.
    compareDNA (anotherOrganism) {
      let identicalProperties = 0;

      for(let x of this.dna) {
          if (x === anotherOrganism.dna[x]) {
            identicalProperties++;
          };
        };
    
      let percentage = Math.floor(identicalProperties / this.dna.length * 100);
      let alertMessage = `Specimen ${this.specimenNum} and specimen ${anotherOrganism.specimenNum} have ${percentage}% identical DNAs.`; 
    
      return alertMessage;
    },

    // Function check if the organism has DNA bases with valie 'G' or 'C' which makes more than 60% of its total number of DNA bases(which is 15).
    // If the organism has more than 60% of 'G' or 'C'(calculated together), then it can survive and the function returns true or false.
    willLikelySurvive () {

      const numberOfGC = [];

      // FOR loop runs through each item in the array of DNA bases and check if it's value is 'G' or 'C', then adds the matching bases to the empty array. 
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'G' || this.dna[i] === 'C') {
          numberOfGC.push(this.dna[i])
        }
      };
    
      const percentage = Math.floor(numberOfGC.length / this.dna.length * 100);

      return percentage >= 60;
    }

  };
  
};

// Function creates a batch of 30 specimen which can survive.
function createBatchToSurvive () {
  const arrayOfOrganisms = [];
  let num = 1;

  // FOR loop runs until the length of the empty array above becomes 30 (not just 30 times).
  // In order for the empty array to have 30 items, each randomly created organism has to pass the survive 
  // function --> the 'if' statement checks if the survive function returns true. If true, the organism is added to the array
  // We need the 'num' variable above to increase by 1 each time in order to have consecutive specimenNum values in the 
  // final batch array. If we use 'i' instead of 'num' the specimenNum in each organism object won't be consecutive
  for (i = 1; arrayOfOrganisms.length < 30; i++) {
    
    let organismToTest = pAequorFactory(num, mockUpStrand());
    if (organismToTest.willLikelySurvive()) {
      arrayOfOrganisms.push(organismToTest);
      num++;
      // console.log(arrayOfOrganisms);
    };
  };

  return arrayOfOrganisms;
}

// Save a batch of 30 surviving organism as a variable
const batch = (createBatchToSurvive());
console.log('A batch of organisms that will survive');
console.log(batch);

// Check if all items in the batch return true value to the survival test function to make sure the program has no bugs
// for(let i = 0; i < 30; i++) {
//   console.log(batch[i].willLikelySurvive());
// };