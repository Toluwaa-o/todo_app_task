import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Tasks } from './pages/Tasks';
import { AllTasks } from './pages/AllTasks';
import { NewTask } from './pages/NewTask';
import { EditTask } from './pages/EditTask';
import { useEffect, useState } from 'react';

function App() {
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    document.body.className = theme; // Apply class to body for theme styles
    localStorage.setItem('theme', theme); // Store theme in localStorage
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path='/tasks/edit/:slug' element={<EditTask />} />
        <Route path="/tasks/:slug" element={<AllTasks />} />
        <Route path="/new-task" element={<NewTask />} />
      </Routes>
    </Router>
  )
}

export default App
