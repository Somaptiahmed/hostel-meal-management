import { useEffect, useState } from "react";


const useMenu = () => {
    const [mealsData, setMealsData] = useState([]);
     const [loading, setLoading] = useState(true); 
    useEffect(() => {
        
       const fetchMeals = async () => {
         try {
           const response = await fetch('http://localhost:5000/menu'); 
           const data = await response.json();
           setMealsData(data); 
         } catch (error) {
           console.error("Error fetching meals data:", error);
         } finally {
           setLoading(false); 
         }
       };
   
       fetchMeals();
     }, []);
     return [mealsData, loading]
}
export default useMenu;