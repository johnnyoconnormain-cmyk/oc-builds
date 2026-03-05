import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div style={{ background: '#1a1a1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏗️</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, marginBottom: 8 }}>Something went wrong</h2>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
              Run <code style={{ background: '#242424', padding: '2px 8px', borderRadius: 4 }}>npx convex dev</code> to connect the backend, then refresh.
            </p>
            <button
              onClick={() => this.setState({ error: null })}
              style={{ background: '#FF6B2B', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
