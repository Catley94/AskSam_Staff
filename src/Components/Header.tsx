import { FC } from "react";

const Header: FC = (): JSX.Element => {

    const headerTitle = "Ask Sam";

  return (
    <>
        <h1 className="text-4xl font-semibold text-slate-600">{headerTitle}</h1>
    </>
  )
}

export default Header;
