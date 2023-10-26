'use client'
export const FilterComponent = ({ filterText, onFilter }: any) => (
   <>
      <input
         id="search"
         type="text"
         className={`text-textColor border-b-2 bg-bgDark rounded-md p-1 ml-4`}
         placeholder="Filtrar per id"
         aria-label="Search Input"
         value={filterText}
         onChange={onFilter}
      />
   </>
);