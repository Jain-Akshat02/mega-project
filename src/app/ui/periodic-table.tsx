import { useMemo, useState } from "react";

type ElementCategory =
  | "alkali metal"
  | "alkaline earth metal"
  | "transition metal"
  | "post-transition metal"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble gas"
  | "lanthanoid"
  | "actinoid"
  | "unknown";
type Element = {
  Z: number; // atomic number
  symbol: string;
  name: string;
  period: number; // 1..7 (main), f-block represented as period 6 & 7 in special row
  group: number | null; // 1..18 or null for f-block
  category: ElementCategory;
  atomicMass?: number;
  xpos: number; // 1..18, grid column
  ypos: number; // 1..10, grid row (1..7 main, 9=lanthanoids, 10=actinoids)
};
export const Elements: Element[] = [
  { Z: 1, symbol: "H", name: "Hydrogen", period: 1, group: 1, category: "nonmetal", xpos: 1, ypos: 1 },
  { Z: 2, symbol: "He", name: "Helium", period: 1, group: 18, category: "noble gas", xpos: 18, ypos: 1 },
  { Z: 3, symbol: "Li", name: "Lithium", period: 2, group: 1, category: "alkali metal", xpos: 1, ypos: 2 },
  { Z: 4, symbol: "Be", name: "Beryllium", period: 2, group: 2, category: "alkaline earth metal", xpos: 2, ypos: 2 },
  { Z: 5, symbol: "B", name: "Boron", period: 2, group: 13, category: "metalloid", xpos: 13, ypos: 2 },
  { Z: 6, symbol: "C", name: "Carbon", period: 2, group: 14, category: "nonmetal", xpos: 14, ypos: 2 },
  { Z: 7, symbol: "N", name: "Nitrogen", period: 2, group: 15, category: "nonmetal", xpos: 15, ypos: 2 },
  { Z: 8, symbol: "O", name: "Oxygen", period: 2, group: 16, category: "nonmetal", xpos: 16, ypos: 2 },
  { Z: 9, symbol: "F", name: "Fluorine", period: 2, group: 17, category: "halogen", xpos: 17, ypos: 2 },
  { Z: 10, symbol: "Ne", name: "Neon", period: 2, group: 18, category: "noble gas", xpos: 18, ypos: 2 },
  { Z: 11, symbol: "Na", name: "Sodium", period: 3, group: 1, category: "alkali metal", xpos: 1, ypos: 3 },
  { Z: 12, symbol: "Mg", name: "Magnesium", period: 3, group: 2, category: "alkaline earth metal", xpos: 2, ypos: 3 },
  { Z: 13, symbol: "Al", name: "Aluminium", period: 3, group: 13, category: "post-transition metal", xpos: 13, ypos: 3 },
  { Z: 14, symbol: "Si", name: "Silicon", period: 3, group: 14, category: "metalloid", xpos: 14, ypos: 3 },
  { Z: 15, symbol: "P", name: "Phosphorus", period: 3, group: 15, category: "nonmetal", xpos: 15, ypos: 3 },
  { Z: 16, symbol: "S", name: "Sulfur", period: 3, group: 16, category: "nonmetal", xpos: 16, ypos: 3 },
  { Z: 17, symbol: "Cl", name: "Chlorine", period: 3, group: 17, category: "halogen", xpos: 17, ypos: 3 },
  { Z: 18, symbol: "Ar", name: "Argon", period: 3, group: 18, category: "noble gas", xpos: 18, ypos: 3 },
  { Z: 19, symbol: "K", name: "Potassium", period: 4, group: 1, category: "alkali metal", xpos: 1, ypos: 4 },
  { Z: 20, symbol: "Ca", name: "Calcium", period: 4, group: 2, category: "alkaline earth metal", xpos: 2, ypos: 4 },
  { Z: 21, symbol: "Sc", name: "Scandium", period: 4, group: 3, category: "transition metal", xpos: 3, ypos: 4 },
  { Z: 22, symbol: "Ti", name: "Titanium", period: 4, group: 4, category: "transition metal", xpos: 4, ypos: 4 },
  { Z: 23, symbol: "V", name: "Vanadium", period: 4, group: 5, category: "transition metal", xpos: 5, ypos: 4 },
  { Z: 24, symbol: "Cr", name: "Chromium", period: 4, group: 6, category: "transition metal", xpos: 6, ypos: 4 },
  { Z: 25, symbol: "Mn", name: "Manganese", period: 4, group: 7, category: "transition metal", xpos: 7, ypos: 4 },
  { Z: 26, symbol: "Fe", name: "Iron", period: 4, group: 8, category: "transition metal", xpos: 8, ypos: 4 },
  { Z: 27, symbol: "Co", name: "Cobalt", period: 4, group: 9, category: "transition metal", xpos: 9, ypos: 4 },
  { Z: 28, symbol: "Ni", name: "Nickel", period: 4, group: 10, category: "transition metal", xpos: 10, ypos: 4 },
  { Z: 29, symbol: "Cu", name: "Copper", period: 4, group: 11, category: "transition metal", xpos: 11, ypos: 4 },
  { Z: 30, symbol: "Zn", name: "Zinc", period: 4, group: 12, category: "transition metal", xpos: 12, ypos: 4 },
  { Z: 31, symbol: "Ga", name: "Gallium", period: 4, group: 13, category: "post-transition metal", xpos: 13, ypos: 4 },
  { Z: 32, symbol: "Ge", name: "Germanium", period: 4, group: 14, category: "metalloid", xpos: 14, ypos: 4 },
  { Z: 33, symbol: "As", name: "Arsenic", period: 4, group: 15, category: "metalloid", xpos: 15, ypos: 4 },
  { Z: 34, symbol: "Se", name: "Selenium", period: 4, group: 16, category: "nonmetal", xpos: 16, ypos: 4 },
  { Z: 35, symbol: "Br", name: "Bromine", period: 4, group: 17, category: "halogen", xpos: 17, ypos: 4 },
  { Z: 36, symbol: "Kr", name: "Krypton", period: 4, group: 18, category: "noble gas", xpos: 18, ypos: 4 },
  { Z: 37, symbol: "Rb", name: "Rubidium", period: 5, group: 1, category: "alkali metal", xpos: 1, ypos: 5 },
  { Z: 38, symbol: "Sr", name: "Strontium", period: 5, group: 2, category: "alkaline earth metal", xpos: 2, ypos: 5 },
  { Z: 39, symbol: "Y", name: "Yttrium", period: 5, group: 3, category: "transition metal", xpos: 3, ypos: 5 },
  { Z: 40, symbol: "Zr", name: "Zirconium", period: 5, group: 4, category: "transition metal", xpos: 4, ypos: 5 },
  { Z: 41, symbol: "Nb", name: "Niobium", period: 5, group: 5, category: "transition metal", xpos: 5, ypos: 5 },
  { Z: 42, symbol: "Mo", name: "Molybdenum", period: 5, group: 6, category: "transition metal", xpos: 6, ypos: 5 },
  { Z: 43, symbol: "Tc", name: "Technetium", period: 5, group: 7, category: "transition metal", xpos: 7, ypos: 5 },
  { Z: 44, symbol: "Ru", name: "Ruthenium", period: 5, group: 8, category: "transition metal", xpos: 8, ypos: 5 },
  { Z: 45, symbol: "Rh", name: "Rhodium", period: 5, group: 9, category: "transition metal", xpos: 9, ypos: 5 },
  { Z: 46, symbol: "Pd", name: "Palladium", period: 5, group: 10, category: "transition metal", xpos: 10, ypos: 5 },
  { Z: 47, symbol: "Ag", name: "Silver", period: 5, group: 11, category: "transition metal", xpos: 11, ypos: 5 },
  { Z: 48, symbol: "Cd", name: "Cadmium", period: 5, group: 12, category: "transition metal", xpos: 12, ypos: 5 },
  { Z: 49, symbol: "In", name: "Indium", period: 5, group: 13, category: "post-transition metal", xpos: 13, ypos: 5 },
  { Z: 50, symbol: "Sn", name: "Tin", period: 5, group: 14, category: "post-transition metal", xpos: 14, ypos: 5 },
  { Z: 51, symbol: "Sb", name: "Antimony", period: 5, group: 15, category: "metalloid", xpos: 15, ypos: 5 },
  { Z: 52, symbol: "Te", name: "Tellurium", period: 5, group: 16, category: "metalloid", xpos: 16, ypos: 5 },
  { Z: 53, symbol: "I", name: "Iodine", period: 5, group: 17, category: "halogen", xpos: 17, ypos: 5 },
  { Z: 54, symbol: "Xe", name: "Xenon", period: 5, group: 18, category: "noble gas", xpos: 18, ypos: 5 },
  { Z: 55, symbol: "Cs", name: "Caesium", period: 6, group: 1, category: "alkali metal", xpos: 1, ypos: 6 },
  { Z: 56, symbol: "Ba", name: "Barium", period: 6, group: 2, category: "alkaline earth metal", xpos: 2, ypos: 6 },
  { Z: 57, symbol: "La", name: "Lanthanum", period: 6, group: 3, category: "lanthanoid", xpos: 3, ypos: 9 },
  { Z: 58, symbol: "Ce", name: "Cerium", period: 6, group: 3, category: "lanthanoid", xpos: 4, ypos: 9 },
  { Z: 59, symbol: "Pr", name: "Praseodymium", period: 6, group: 3, category: "lanthanoid", xpos: 5, ypos: 9 },
  { Z: 60, symbol: "Nd", name: "Neodymium", period: 6, group: 3, category: "lanthanoid", xpos: 6, ypos: 9 },
  { Z: 61, symbol: "Pm", name: "Promethium", period: 6, group: 3, category: "lanthanoid", xpos: 7, ypos: 9 },
  { Z: 62, symbol: "Sm", name: "Samarium", period: 6, group: 3, category: "lanthanoid", xpos: 8, ypos: 9 },
  { Z: 63, symbol: "Eu", name: "Europium", period: 6, group: 3, category: "lanthanoid", xpos: 9, ypos: 9 },
  { Z: 64, symbol: "Gd", name: "Gadolinium", period: 6, group: 3, category: "lanthanoid", xpos: 10, ypos: 9 },
  { Z: 65, symbol: "Tb", name: "Terbium", period: 6, group: 3, category: "lanthanoid", xpos: 11, ypos: 9 },
  { Z: 66, symbol: "Dy", name: "Dysprosium", period: 6, group: 3, category: "lanthanoid", xpos: 12, ypos: 9 },
  { Z: 67, symbol: "Ho", name: "Holmium", period: 6, group: 3, category: "lanthanoid", xpos: 13, ypos: 9 },
  { Z: 68, symbol: "Er", name: "Erbium", period: 6, group: 3, category: "lanthanoid", xpos: 14, ypos: 9 },
  { Z: 69, symbol: "Tm", name: "Thulium", period: 6, group: 3, category: "lanthanoid", xpos: 15, ypos: 9 },
  { Z: 70, symbol: "Yb", name: "Ytterbium", period: 6, group: 3, category: "lanthanoid", xpos: 16, ypos: 9 },
  { Z: 71, symbol: "Lu", name: "Lutetium", period: 6, group: 3, category: "lanthanoid", xpos: 17, ypos: 9 },
  { Z: 72, symbol: "Hf", name: "Hafnium", period: 6, group: 4, category: "transition metal", xpos: 4, ypos: 6 },
  { Z: 73, symbol: "Ta", name: "Tantalum", period: 6, group: 5, category: "transition metal", xpos: 5, ypos: 6 },
  { Z: 74, symbol: "W", name: "Tungsten", period: 6, group: 6, category: "transition metal", xpos: 6, ypos: 6 },
  { Z: 75, symbol: "Re", name: "Rhenium", period: 6, group: 7, category: "transition metal", xpos: 7, ypos: 6 },
  { Z: 76, symbol: "Os", name: "Osmium", period: 6, group: 8, category: "transition metal", xpos: 8, ypos: 6 },
  { Z: 77, symbol: "Ir", name: "Iridium", period: 6, group: 9, category: "transition metal", xpos: 9, ypos: 6 },
  { Z: 78, symbol: "Pt", name: "Platinum", period: 6, group: 10, category: "transition metal", xpos: 10, ypos: 6 },
  { Z: 79, symbol: "Au", name: "Gold", period: 6, group: 11, category: "transition metal", xpos: 11, ypos: 6 },
  { Z: 80, symbol: "Hg", name: "Mercury", period: 6, group: 12, category: "transition metal", xpos: 12, ypos: 6 },
  { Z: 81, symbol: "Tl", name: "Thallium", period: 6, group: 13, category: "post-transition metal", xpos: 13, ypos: 6 },
  { Z: 82, symbol: "Pb", name: "Lead", period: 6, group: 14, category: "post-transition metal", xpos: 14, ypos: 6 },
  { Z: 83, symbol: "Bi", name: "Bismuth", period: 6, group: 15, category: "post-transition metal", xpos: 15, ypos: 6 },
  { Z: 84, symbol: "Po", name: "Polonium", period: 6, group: 16, category: "metalloid", xpos: 16, ypos: 6 },
  { Z: 85, symbol: "At", name: "Astatine", period: 6, group: 17, category: "halogen", xpos: 17, ypos: 6 },
  { Z: 86, symbol: "Rn", name: "Radon", period: 6, group: 18, category: "noble gas", xpos: 18, ypos: 6 },
  { Z: 87, symbol: "Fr", name: "Francium", period: 7, group: 1, category: "alkali metal", xpos: 1, ypos: 7 },
  { Z: 88, symbol: "Ra", name: "Radium", period: 7, group: 2, category: "alkaline earth metal", xpos: 2, ypos: 7 },
  { Z: 89, symbol: "Ac", name: "Actinium", period: 7, group: 3, category: "actinoid", xpos: 3, ypos: 10 },
  { Z: 90, symbol: "Th", name: "Thorium", period: 7, group: 3, category: "actinoid", xpos: 4, ypos: 10 },
  { Z: 91, symbol: "Pa", name: "Protactinium", period: 7, group: 3, category: "actinoid", xpos: 5, ypos: 10 },
  { Z: 92, symbol: "U", name: "Uranium", period: 7, group: 3, category: "actinoid", xpos: 6, ypos: 10 },
  { Z: 93, symbol: "Np", name: "Neptunium", period: 7, group: 3, category: "actinoid", xpos: 7, ypos: 10 },
  { Z: 94, symbol: "Pu", name: "Plutonium", period: 7, group: 3, category: "actinoid", xpos: 8, ypos: 10 },
  { Z: 95, symbol: "Am", name: "Americium", period: 7, group: 3, category: "actinoid", xpos: 9, ypos: 10 },
  { Z: 96, symbol: "Cm", name: "Curium", period: 7, group: 3, category: "actinoid", xpos: 10, ypos: 10 },
  { Z: 97, symbol: "Bk", name: "Berkelium", period: 7, group: 3, category: "actinoid", xpos: 11, ypos: 10 },
  { Z: 98, symbol: "Cf", name: "Californium", period: 7, group: 3, category: "actinoid", xpos: 12, ypos: 10 },
  { Z: 99, symbol: "Es", name: "Einsteinium", period: 7, group: 3, category: "actinoid", xpos: 13, ypos: 10 },
  { Z: 100, symbol: "Fm", name: "Fermium", period: 7, group: 3, category: "actinoid", xpos: 14, ypos: 10 },
  { Z: 101, symbol: "Md", name: "Mendelevium", period: 7, group: 3, category: "actinoid", xpos: 15, ypos: 10 },
  { Z: 102, symbol: "No", name: "Nobelium", period: 7, group: 3, category: "actinoid", xpos: 16, ypos: 10 },
  { Z: 103, symbol: "Lr", name: "Lawrencium", period: 7, group: 3, category: "actinoid", xpos: 17, ypos: 10 },
  { Z: 104, symbol: "Rf", name: "Rutherfordium", period: 7, group: 4, category: "transition metal", xpos: 4, ypos: 7 },
  { Z: 105, symbol: "Db", name: "Dubnium", period: 7, group: 5, category: "transition metal", xpos: 5, ypos: 7 },
  { Z: 106, symbol: "Sg", name: "Seaborgium", period: 7, group: 6, category: "transition metal", xpos: 6, ypos: 7 },
  { Z: 107, symbol: "Bh", name: "Bohrium", period: 7, group: 7, category: "transition metal", xpos: 7, ypos: 7 },
  { Z: 108, symbol: "Hs", name: "Hassium", period: 7, group: 8, category: "transition metal", xpos: 8, ypos: 7 },
  { Z: 109, symbol: "Mt", name: "Meitnerium", period: 7, group: 9, category: "unknown", xpos: 9, ypos: 7 },
  { Z: 110, symbol: "Ds", name: "Darmstadtium", period: 7, group: 10, category: "unknown", xpos: 10, ypos: 7 },
  { Z: 111, symbol: "Rg", name: "Roentgenium", period: 7, group: 11, category: "unknown", xpos: 11, ypos: 7 },
  { Z: 112, symbol: "Cn", name: "Copernicium", period: 7, group: 12, category: "transition metal", xpos: 12, ypos: 7 },
  { Z: 113, symbol: "Nh", name: "Nihonium", period: 7, group: 13, category: "unknown", xpos: 13, ypos: 7 },
  { Z: 114, symbol: "Fl", name: "Flerovium", period: 7, group: 14, category: "post-transition metal", xpos: 14, ypos: 7 },
  { Z: 115, symbol: "Mc", name: "Moscovium", period: 7, group: 15, category: "unknown", xpos: 15, ypos: 7 },
  { Z: 116, symbol: "Lv", name: "Livermorium", period: 7, group: 16, category: "unknown", xpos: 16, ypos: 7 },
  { Z: 117, symbol: "Ts", name: "Tennessine", period: 7, group: 17, category: "unknown", xpos: 17, ypos: 7 },
  { Z: 118, symbol: "Og", name: "Oganesson", period: 7, group: 18, category: "unknown", xpos: 18, ypos: 7 }
];

export default function Periodic() {
  const [selcted, setSelected] = useState<Element | null>(null);
  return (
    <>
      <div className="mt-30">

      </div>
      <div
        className="grid gap-2 rounded-lg shadow-md hover:shadow-lg m-5 overflow-auto max-h-screen p-4"
        style={{
          gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
          gridTemplateRows: "repeat(10, 64px)",
        }}
      >
        {Elements.map((el) => (
          <button
            key={el.Z}
            style={{
              gridColumn: el.xpos,
              gridRow: el.ypos,
            }}
            className="rounded-xl border p-2 hover:ring-4 w-15 h-15 text-sm text-gray-200 border-blue-500 shadow-md hover:shadow-lg"
            onClick={() => setSelected(el)}
          >
            <div>{el.symbol}</div>
            <div>{el.Z}</div>
          </button>
        ))}
      </div>
    </>
  );
}
