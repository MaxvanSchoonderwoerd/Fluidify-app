type THeaderComponentProps = {
  page: string;
};

export default function HeaderComponent(props: THeaderComponentProps) {
  return (
    <header className="w-full flex justify-center bg-slate-200">
      <div className="w-[80vw]">
        <ul className="flex justify-around flex-row">
          <li className="hover:bg-white p-2">Registratie</li>
          <li className="hover:bg-white p-2">Inzicht</li>
        </ul>
      </div>
    </header>
  );
}
