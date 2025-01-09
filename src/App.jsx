import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Tasks } from './pages/Tasks';
import { AllTasks } from './pages/AllTasks';
import { NewTask } from './pages/NewTask';
import { EditTask } from './pages/EditTask';
import { useEffect, useState } from 'react';

function App() {
  // Retrieve the stored theme from localStorage or default to 'light'
  const storedTheme = localStorage.getItem('theme') || 'light';
  
  // State to manage the current theme
  const [theme, setTheme] = useState(storedTheme);

  // Apply the theme to the body and store the theme in localStorage when it changes
  useEffect(() => {
    document.body.className = theme; // Apply the theme as a class on the body for styling
    document.body.style.backgroundColor = theme === 'light' ? '#FFFFFF' : '#222831'; // Change background color based on theme
    localStorage.setItem('theme', theme); // Save the selected theme to localStorage
  }, [theme]);

  return (
    // Set up React Router for routing between different pages
    <Router>
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<Home />} />
        
        {/* Tasks overview page route */}
        <Route path="/tasks" element={<Tasks />} />
        
        {/* Edit specific task page route, with dynamic parameter for task slug */}
        <Route path='/tasks/edit/:slug' element={<EditTask />} />
        
        {/* View all tasks for a specific task, using dynamic slug parameter */}
        <Route path="/tasks/:slug" element={<AllTasks />} />
        
        {/* New task creation page route */}
        <Route path="/new-task" element={<NewTask />} />
      </Routes>
    </Router>
  );
}

export default App;
