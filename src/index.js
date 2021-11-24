import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import "./index.css"

import {
  Home,
  Days,
} from './components/Pages'
import { CustomTheme } from "./utils/CustomTheme"


ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={CustomTheme}>
      <BrowserRouter>
        <Routes>
          {
            Days.map((Day, index) => {
              return <Route key={index} path={`/day-${index}`} element={<Day />} />
            })
          }
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
