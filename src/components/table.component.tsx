export const cellStylesValues = (row: any, centro: any) => {
   return [
      {
         when: (row: any): any => {
            if (row.objectiu) {
               return false;
            }
            return true;
         },
         style: {
            backgroundColor: '',
            color: '',
         },
      },
      {
         when: (row: any) => {
            let objetivo = (row.objectiu && row.invers) ? -row.objectiu : row.objectiu;
            if (objetivo > 0) {
               if (row[centro.name] >= objetivo) return true
               else return false
            } else {
               if (row[centro.name] <= objetivo) return true
               else return false
            }
         },
         style: {
            backgroundColor: 'var(--green)',
            color: 'var(--white)',
         },
      },
      {
         when: (row: any) => {
            let objetivo = (row.objectiu && row.invers) ? -row.objectiu : row.objectiu;
            if (objetivo > 0) {
               if (row[centro.name] <= objetivo) return true
               else return false
            } else {
               if (row[centro.name] >= objetivo) return true
               else return false
            }
         },
         style: {
            backgroundColor: 'var(--red)',
            color: 'var(--white)'
         },
      }
   ];
};