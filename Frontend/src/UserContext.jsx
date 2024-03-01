import React from 'react';

// Creates a Context object
// A context object as the name states is a data type of an object that can be used to store information that can be shared to other components within the app.
// The context object is a different approach to passing information between components and allows easier access by avoiding the use of prop-drilling
const UserContext = React.createContext();

// The "Provider" component allows other components to consume/use the context object and supply the necessary information needed to the context object.
export const UserProvider = UserContext.Provider;

// 'useState' is for managing local/individual component state, while 'useContext' is for accessing shared state at a higher level, providing a way to avoid prop drilling and manage STATE globally within a part of your application
export default UserContext;