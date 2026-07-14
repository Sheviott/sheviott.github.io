import { useParams } from "react-router"

export default function ItemPage () {
  const { id } = useParams()
  return (
    <div>
      Айди карточки: {id}
    </div>
  )
}
