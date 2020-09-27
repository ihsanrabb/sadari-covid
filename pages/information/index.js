import BottomNavigation from '../../components/BottomNavigation'
import InformationList from '../../components/InformationList'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'

const Information = () => {
  const [newsList, setNewsList] = useState([])

  useEffect(() => {
    db.collection("news").orderBy("date", "desc").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        let data = {
          title: doc.data().title,
          date: doc.data().date.toDate(),
          sub_description: doc.data().sub_description,
          description: doc.data().description,
          imageURL: doc.data().imageURL
        }
        setNewsList(prevList => [...prevList, {
          id:doc.id,
          data:data
        }])
      });
    });
  }, [])

  return (
    <>
      <InformationList newsList={newsList} />
      <BottomNavigation className="navigation-bottom" />
    </>
  )
}

export default Information