// Herramienta de debugging para viewport real vs simulación
export const getViewportInfo = () => {
  const info = {
    // Dimensiones reales del viewport
    width: window.innerWidth,
    height: window.innerHeight,
    
    // Dimensiones del screen (dispositivo completo)
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    
    // Pixel ratio (densidad de pantalla)
    pixelRatio: window.devicePixelRatio || 1,
    
    // User Agent para identificar dispositivo real
    userAgent: navigator.userAgent,
    
    // Detectar si es móvil real
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    
    // Detectar si es iOS
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
    
    // Detectar si es Android
    isAndroid: /Android/.test(navigator.userAgent),
    
    // Orientación
    orientation: window.orientation || window.screen.orientation?.angle || 0,
    
    // Safari vs otros navegadores
    isSafari: /Safari/.test(navigator.userAgent) && !/Chrome|CriOS|FxiOS/.test(navigator.userAgent)
  };
  
  return info;
};

// Componente de debugging visual
export const ViewportDebugger = () => {
  const info = getViewportInfo();
  
  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      fontFamily: 'monospace',
      maxWidth: '300px',
      display: 'none' // Cambiar a 'block' para activar debugging
    }}>
      <div>Viewport: {info.width}x{info.height}</div>
      <div>Screen: {info.screenWidth}x{info.screenHeight}</div>
      <div>Pixel Ratio: {info.pixelRatio}</div>
      <div>Mobile Real: {info.isMobile ? 'SÍ' : 'NO'}</div>
      <div>iOS: {info.isIOS ? 'SÍ' : 'NO'}</div>
      <div>Android: {info.isAndroid ? 'SÍ' : 'NO'}</div>
      <div>Safari: {info.isSafari ? 'SÍ' : 'NO'}</div>
      <div>Orientación: {info.orientation}°</div>
    </div>
  );
};

// Hook para ajustes específicos por dispositivo
export const useDeviceDetection = () => {
  const info = getViewportInfo();
  
  return {
    // Breakpoints ajustados para dispositivos reales
    isSmallMobile: info.width <= 375, // iPhone SE
    isMobile: info.width <= 768,
    isTablet: info.width > 768 && info.width <= 1024,
    isDesktop: info.width > 1024,
    
    // Ajustes específicos para iOS
    isIOSMobile: info.isIOS && info.isMobile,
    
    // Ajustes para Android
    isAndroidMobile: info.isAndroid && info.isMobile,
    
    // Ajustes para Safari mobile
    isSafariMobile: info.isSafari && info.isMobile,
    
    // Viewport info completa
    viewportInfo: info
  };
};
