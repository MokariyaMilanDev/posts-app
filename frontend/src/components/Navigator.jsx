import { Link } from "react-router-dom"
import { useBackPath } from "../hooks/useBackPath";

function Navigator() {
  const backPath = useBackPath();

  return (
    <div className="flex p-4">
      <Link to={backPath} className="">
        Back
      </Link>
    </div>
  )
}

export default Navigator