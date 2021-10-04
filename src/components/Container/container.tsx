import React from 'react'

const Container: React.FC = ({ children }) => {
    return <div className="container m-auto px-4 md:px-20 lg:px-32">{children}</div>
}

export default Container