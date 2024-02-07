const motionContainer = {
    start: { opacity: 0 },
    end: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  
  const item = {
    start: { y: "-10px", opacity: 0 },
    end: { y: "0", opacity: 1, transition: { duration: 0.3 } }
  }
  
  // 在組件外部定義，確保在重新渲染時不會丟失
  export { motionContainer, item };