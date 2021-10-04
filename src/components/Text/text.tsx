import React from 'react'

interface TextProps {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle-1' | 'subtitle-2' | 'body-1' | 'body-2' | 'button' | 'caption' | 'overline';
    className?: string;
}

const Text: React.FC<TextProps> = ({ children, variant, className }) => {
    return <div className={`${className} font-sans`}>
        {variant === 'h1' && <h1 className="text-6xl md:text-7xl font-black">{children}</h1>}
        {variant === 'h2' && <h2 className="text-6xl md:text-7xl font-bold">{children}</h2>}
        {variant === 'h3' && <h3 className="text-6xl font-bold">{children}</h3>}
        {variant === 'h4' && <h4 className="text-5xl font-black">{children}</h4>}
        {variant === 'h5' && <h5 className="text-4xl font-black">{children}</h5>}
        {variant === 'h6' && <h6 className="text-3xl font-bold">{children}</h6>}
        {variant === 'subtitle-1' && <p className="text-sm">{children}</p>}
        {variant === 'subtitle-2' && <p className="text-base">{children}</p>}
        {variant === 'body-1' && <p className="text-lg font-bold">{children}</p>}
        {variant === 'body-2' && <p className="text-base font-normal">{children}</p>}
        {variant === 'button' && <p className="text-base">{children}</p>}
        {variant === 'caption' && <p className="text-xs">{children}</p>}
        {variant === 'overline' && <p className="text-xs">{children}</p>}
    </div>
}

export default Text