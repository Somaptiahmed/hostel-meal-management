

// import React from 'react';
// import { NavLink, Outlet, Navigate } from 'react-router-dom';
// import Navbar from '../Pages/Shared/Navbar';
// import Footer from '../Pages/Shared/Footer';
// import { FaCalendar, FaCalendarAlt, FaCcMastercard, FaClipboardList, FaComment, FaList, FaPeopleArrows, FaRegEnvelope, FaUser, FaUsers, FaUtensils } from 'react-icons/fa';
// import { ImProfile } from 'react-icons/im';

// const Dashboard = () => {
//   const currentPath = window.location.pathname;

//   const isAdmin = true;

//   return (
//     <div>
//       <Navbar />
//       <div className="flex my-20">
//         {/* Sidebar */}
//         <div className="w-64 min-h-screen bg-orange-800">
//         {
//           isAdmin ? 
         
//           <>
//           <ul className="text-white p-4 space-y-4 pt-10">
//             <li>
//               <div className='flex items-center'>
//               <ImProfile className='mr-2'></ImProfile>
//               <NavLink
//                 to="/dashboard/profile"
//                 className={({ isActive }) =>
//                   isActive ? 'font-bold' : 'hover:text-blue-300'
//                 }
//               >
//                 My Profile
//               </NavLink>
//               </div>
//             </li>
            
//             <li>
//               <div className='flex items-center'>
//               <FaUsers className='mr-2'></FaUsers>
//               <NavLink
//                 to="/dashboard/users"
//                 className={({ isActive }) =>
//                   isActive ? 'font-bold' : 'hover:text-blue-300'
//                 }
//               >
//                 All Users
//               </NavLink>
//               </div>
            
//               <li>
//               <div className='flex items-center'><FaUtensils className='mr-2'></FaUtensils>
//               <NavLink
//                 to="/dashboard/add"
//                 className={({ isActive }) =>
//                   isActive ? 'font-bold' : 'hover:text-blue-300'
//                 }
//               >
//                 Add Meal
//               </NavLink>
//               </div>
//               </li>
//               <li>
//               <div className='flex items-center'><FaComment className='mr-2'></FaComment>
//               <NavLink
//                 to="/dashboard/allReview"
//                 className={({ isActive }) =>
//                   isActive ? 'font-bold' : 'hover:text-blue-300'
//                 }
//               >
//                 All Review
//               </NavLink>
//               </div>
//               </li>
//             </li>
//             <li>
//             <div className='flex items-center '>
//               <FaList className='mr-2'></FaList>
//               <NavLink
//                 to="/dashboard/allMeals"
//                 className={({ isActive }) =>
//                   isActive ? 'font-bold' : 'hover:text-blue-300'
//                 }
//               >
//                 All Meals
//               </NavLink>
//               </div>
//             </li>
//             <li>
//             <div className='flex items-center '>
//               <FaClipboardList className='mr-2'></FaClipboardList>
//               <NavLink
//                 to="/dashboard/serveMeals"
//                 className={({ isActive }) =>
//                   isActive ? 'font-bold' : 'hover:text-blue-300'
//                 }
//               >
//                 Serve Meals
//               </NavLink>
//               </div>
//             </li>
//             <li>
//             <div className='flex items-center '>
//               <FaCalendarAlt></FaCalendarAlt>
//               <NavLink
//                 to="/dashboard/upcoming"
//                 className={({ isActive }) =>
//                   isActive ? 'font-bold' : 'hover:text-blue-300'
//                 }
//               >
//                 Upcoming Meals
//               </NavLink>
//               </div>
//             </li>
            
//           </ul>
//           </>
//           :
//            <>
//            <ul className="text-white p-4 space-y-4 pt-10">
//              <li>
//                <div className='flex items-center'>
//                <ImProfile className='mr-2'></ImProfile>
//                <NavLink
//                  to="/dashboard/myProfile"
//                  className={({ isActive }) =>
//                    isActive ? 'font-bold' : 'hover:text-blue-300'
//                  }
//                >
//                  My Profile
//                </NavLink>
//                </div>
//              </li>
//              <li>
//                <div className='flex items-center'><FaComment className='mr-2'></FaComment>
//                <NavLink
//                  to="/dashboard/myReview"
//                  className={({ isActive }) =>
//                    isActive ? 'font-bold' : 'hover:text-blue-300'
//                  }
//                >
//                  My Review
//                </NavLink>
//                </div>
//              </li>
//              <li>
//              <div className='flex items-center '>
//                <FaClipboardList className='mr-2'></FaClipboardList>
//                <NavLink
//                  to="/dashboard/requestedMeals"
//                  className={({ isActive }) =>
//                    isActive ? 'font-bold' : 'hover:text-blue-300'
//                  }
//                >
//                  My Requested Meals
//                </NavLink>
//                </div>
//              </li>
//              <li>
//                <div className='flex items-center'>
//                <FaCcMastercard className='mr-2'></FaCcMastercard>
//                <NavLink
//                  to="/dashboard/payment"
//                  className={({ isActive }) =>
//                    isActive ? 'font-bold' : 'hover:text-blue-300'
//                  }
//                >
//                  Payment History
//                </NavLink>
//                </div>
//              </li>
//            </ul>
//            </>
            
//         }
//           <div className='divider'></div>
          

          


        
//         </div>
        

//         {/* Right-side */}
//         <div className="flex-1 p-4">
//           {/* Redirect to MyProfile if on the base /dashboard path */}
//           {currentPath === '/dashboard' && <Navigate to="/dashboard/myProfile" replace />}
//           <Outlet />
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar';
import Footer from '../Pages/Shared/Footer';
import { FaCalendar, FaCalendarAlt, FaCcMastercard, FaClipboardList, FaComment, FaList, FaPeopleArrows, FaRegEnvelope, FaUser, FaUsers, FaUtensils } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const Dashboard = () => {
  const currentPath = window.location.pathname;
  const isAdmin = true;

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row my-20">
        {/* Sidebar */}
        <div className="lg:w-64 min-h-screen bg-orange-800 text-white p-4 space-y-4 pt-10">
          {isAdmin ? (
            <>
              <ul>
                <li>
                  <div className='flex items-center'>
                    <ImProfile className='mr-2' />
                    <NavLink
                      to="/dashboard/profile"
                      className={({ isActive }) => isActive ? 'font-bold text-blue-300' : 'hover:text-blue-300'}
                    >
                      My Profile
                    </NavLink>
                  </div>
                </li>

                <li>
                  <div className='flex items-center'>
                    <FaUsers className='mr-2' />
                    <NavLink
                      to="/dashboard/users"
                      className={({ isActive }) => isActive ? 'font-bold text-blue-300' : 'hover:text-blue-300'}
                    >
                      All Users
                    </NavLink>
                  </div>
                </li>

                <li>
                  <div className='flex items-center'>
                    <FaUtensils className='mr-2' />
                    <NavLink
                      to="/dashboard/add"
                      className={({ isActive }) => isActive ? 'font-bold text-blue-300' : 'hover:text-blue-300'}
                    >
                      Add Meal
                    </NavLink>
                  </div>
                </li>

                <li>
                  <div className='flex items-center'>
                    <FaComment className='mr-2' />
                    <NavLink
                      to="/dashboard/allReview"
                      className={({ isActive }) => isActive ? 'font-bold text-blue-300' : 'hover:text-blue-300'}
                    >
                      All Review
                    </NavLink>
                  </div>
                </li>

                <li>
                  <div className='flex items-center'>
                    <FaList className='mr-2' />
                    <NavLink
                      to="/dashboard/allMeals"
                      className={({ isActive }) => isActive ? 'font-bold text-blue-300' : 'hover:text-blue-300'}
                    >
                      All Meals
                    </NavLink>
                  </div>
                </li>

                <li>
                  <div className='flex items-center'>
                    <FaClipboardList className='mr-2' />
                    <NavLink
                      to="/dashboard/serveMeals"
                      className={({ isActive }) => isActive ? 'font-bold text-blue-300' : 'hover:text-blue-300'}
                    >
                      Serve Meals
                    </NavLink>
                  </div>
                </li>

                <li>
                  <div className='flex items-center'>
                    <FaCalendarAlt className='mr-2' />
                    <NavLink
                      to="/dashboard/upcoming"
                      className={({ isActive }) => isActive ? 'font-bold text-blue-300' : 'hover:text-blue-300'}
                    >
                      Upcoming Meals
                    </NavLink>
                  </div>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul>
                <li>
                  <div className='flex items-center'>
                    <ImProfile className='mr-2' />
                    <NavLink
                      to="/dashboard/myProfile"
                      className={({ isActive }) => isActive ? 'font-bold text-blue-300' : 'hover:text-blue-300'}
                    >
                      My Profile
                    </NavLink>
                  </div>
                </li>

                <li>
                  <div className='flex items-center'>
                    <FaComment className='mr-2' />
                    <NavLink
                      to="/dashboard/myReview"
                      className={({ isActive }) => isActive ? 'font-bold text-blue-300' : 'hover:text-blue-300'}
                    >
                      My Review
                    </NavLink>
                  </div>
                </li>

                <li>
                  <div className='flex items-center'>
                    <FaClipboardList className='mr-2' />
                    <NavLink
                      to="/dashboard/requestedMeals"
                      className={({ isActive }) => isActive ? 'font-bold text-blue-300' : 'hover:text-blue-300'}
                    >
                      My Requested Meals
                    </NavLink>
                  </div>
                </li>

                <li>
                  <div className='flex items-center'>
                    <FaCcMastercard className='mr-2' />
                    <NavLink
                      to="/dashboard/payment"
                      className={({ isActive }) => isActive ? 'font-bold text-blue-300' : 'hover:text-blue-300'}
                    >
                      Payment History
                    </NavLink>
                  </div>
                </li>
              </ul>
            </>
          )}
          <div className="divider"></div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4">
          {/* Redirect to MyProfile if on the base /dashboard path */}
          {currentPath === '/dashboard' && <Navigate to="/dashboard/myProfile" replace />}
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
