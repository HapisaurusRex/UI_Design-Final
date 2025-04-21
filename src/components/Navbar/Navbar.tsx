import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Main Navigation">
        <div className="container-fluid border-bottom">
            <a className="navbar-brand" href="/">Home</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" aria-controls="navbarNav"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link" href="/layering">Layering</Link></li>
                    <li className="nav-item"><Link className="nav-link" href="/clothing">Clothing Type</Link></li>
                    <li className="nav-item"><Link className="nav-link" href="/material">Material</Link></li>
                    <li className="nav-item"><Link className="nav-link" href="/quiz">Quiz</Link></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}
