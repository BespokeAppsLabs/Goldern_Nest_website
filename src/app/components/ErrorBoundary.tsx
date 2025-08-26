import React, { Component, ErrorInfo, ReactNode } from 'react';

// Enhanced error information interface
export interface ErrorDetails {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: Date;
  userAgent: string;
  url: string;
  additionalData?: Record<string, any>;
}

// Error boundary props interface
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo, errorDetails: ErrorDetails) => void;
  enableRetry?: boolean;
  retryAttempts?: number;
  showErrorDetails?: boolean;
  className?: string;
}

// Error boundary state interface
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
}

// Enhanced error boundary component
export class ModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorDetails: ErrorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack || undefined,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      additionalData: {
        retryCount: this.state.retryCount,
        componentName: 'ModelErrorBoundary'
      }
    };

    // Log error details to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 3D Model Error Boundary');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.table(errorDetails);
      console.groupEnd();
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo, errorDetails);

    // Update state with error info
    this.setState({
      errorInfo
    });

    // Auto-retry if enabled
    if (this.props.enableRetry && this.state.retryCount < (this.props.retryAttempts || 3)) {
      this.retryTimeoutId = setTimeout(() => {
        this.handleRetry();
      }, Math.min(1000 * Math.pow(2, this.state.retryCount), 10000)); // Exponential backoff
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleManualRetry = () => {
    this.handleRetry();
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className={`error-boundary ${this.props.className || ''}`}>
          <div className="error-content">
            <div className="error-icon">🚨</div>
            <h3 className="error-title">3D Model Error</h3>
            <p className="error-message">
              Something went wrong while loading the 3D model.
            </p>

            {this.props.showErrorDetails && this.state.error && (
              <details className="error-details">
                <summary>Error Details</summary>
                <pre className="error-stack">
                  {this.state.error.message}
                  {this.state.error.stack && `\n\n${this.state.error.stack}`}
                </pre>
              </details>
            )}

            <div className="error-actions">
              {this.props.enableRetry && this.state.retryCount < (this.props.retryAttempts || 3) && (
                        <button
          type="button"
          onClick={this.handleManualRetry}
          className="retry-button"
          disabled={this.retryTimeoutId !== null}
        >
          {this.retryTimeoutId ? 'Retrying...' : 'Try Again'}
        </button>
              )}

                      <button
          type="button"
          onClick={() => window.location.reload()}
          className="reload-button"
        >
          Reload Page
        </button>
            </div>

            <div className="error-meta">
              <small>
                Attempt {this.state.retryCount + 1}
                {this.props.retryAttempts && ` of ${this.props.retryAttempts + 1}`}
              </small>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Specialized error boundary for 3D models
export class ThreeDErrorBoundary extends ModelErrorBoundary {
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="three-d-error-boundary">
          <div className="error-container">
            <div className="error-emoji">🎯</div>
            <h4>3D Scene Error</h4>
            <p>The 3D model failed to load properly.</p>
            <p className="error-hint">
              This might be due to:
            </p>
            <ul className="error-reasons">
              <li>Network connectivity issues</li>
              <li>Unsupported browser features</li>
              <li>Graphics driver problems</li>
              <li>Memory constraints</li>
            </ul>

            {this.props.enableRetry && (
              <button
                onClick={this.handleManualRetry}
                className="retry-button-3d"
              >
                Reload 3D Content
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading manager component
interface LoadingManagerProps {
  children: ReactNode;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
  className?: string;
}

export function LoadingManager({
  children,
  onProgress,
  onComplete,
  onError,
  timeout = 30000,
  className
}: LoadingManagerProps) {
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        const clampedProgress = Math.min(newProgress, 90);

        onProgress?.(clampedProgress);

        if (clampedProgress >= 90) {
          clearInterval(interval);
          // Complete loading after a brief delay
          setTimeout(() => {
            setLoadingProgress(100);
            setIsLoaded(true);
            onProgress?.(100);
            onComplete?.();
          }, 500);
        }

        return clampedProgress;
      });
    }, 200);

    // Set timeout for loading
    timeoutRef.current = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true);
        onError?.(new Error('Loading timeout exceeded'));
      }
    }, timeout);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoaded, onProgress, onComplete, onError, timeout]);

  if (hasError) {
    return (
      <div className={`loading-error ${className || ''}`}>
        <div className="error-display">
          <span className="error-icon">⏱️</span>
          <p>Loading took too long. Please try again.</p>
          <button onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`loading-manager ${className || ''}`}>
        <div className="loading-content">
          <div className="loading-spinner" />
          <div className="loading-text">
            Loading 3D content...
          </div>
          <div className="loading-bar">
            <div
              className="loading-fill"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="loading-percentage">
            {Math.round(loadingProgress)}%
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Specialized loading component for 3D models
interface ModelLoaderProps {
  modelName?: string;
  showProgress?: boolean;
  progressBarColor?: string;
  spinnerColor?: string;
  className?: string;
}

export function ModelLoader({
  modelName = "3D Model",
  showProgress = true,
  progressBarColor = "#3b82f6",
  spinnerColor = "#3b82f6",
  className
}: ModelLoaderProps) {
  const [progress, setProgress] = React.useState(0);
  const [loadingStage, setLoadingStage] = React.useState('Initializing...');

  React.useEffect(() => {
    const stages = [
      'Initializing...',
      'Loading geometry...',
      'Loading textures...',
      'Processing materials...',
      'Setting up animations...',
      'Almost ready...'
    ];

    let currentStage = 0;
    const stageInterval = setInterval(() => {
      if (currentStage < stages.length - 1) {
        currentStage++;
        setLoadingStage(stages[currentStage]);
      }
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 20;
        const newProgress = Math.min(prev + increment, 95);
        return newProgress;
      });
    }, 300);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className={`model-loader ${className || ''}`}>
      <div className="loader-content">
        <div className="loader-header">
          <div
            className="loader-spinner"
            style={{ borderColor: spinnerColor }}
          />
          <h4>Loading {modelName}</h4>
        </div>

        <div className="loader-stage">
          <span className="stage-text">{loadingStage}</span>
        </div>

        {showProgress && (
          <div className="loader-progress">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                  backgroundColor: progressBarColor
                }}
              />
            </div>
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>
        )}

        <div className="loader-tips">
          <small>
            💡 Tip: Ensure stable internet for best loading experience
          </small>
        </div>
      </div>
    </div>
  );
}

// Error recovery hook
export const useErrorRecovery = (
  maxRetries: number = 3,
  retryDelay: number = 1000
) => {
  const [retryCount, setRetryCount] = React.useState(0);
  const [isRetrying, setIsRetrying] = React.useState(false);
  const [lastError, setLastError] = React.useState<Error | null>(null);

  const attemptRecovery = React.useCallback(async (
    recoveryFunction: () => Promise<void>
  ) => {
    if (retryCount >= maxRetries) {
      throw new Error(`Max retries (${maxRetries}) exceeded. Last error: ${lastError?.message}`);
    }

    setIsRetrying(true);

    try {
      await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, retryCount)));
      await recoveryFunction();
      setRetryCount(0); // Reset on success
      setLastError(null);
    } catch (error) {
      setRetryCount(prev => prev + 1);
      setLastError(error as Error);
      throw error;
    } finally {
      setIsRetrying(false);
    }
  }, [retryCount, maxRetries, retryDelay, lastError]);

  const reset = React.useCallback(() => {
    setRetryCount(0);
    setLastError(null);
    setIsRetrying(false);
  }, []);

  return {
    retryCount,
    isRetrying,
    lastError,
    attemptRecovery,
    reset,
    canRetry: retryCount < maxRetries
  };
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = React.useState({
    loadTime: 0,
    renderTime: 0,
    frameRate: 60,
    memoryUsage: 0
  });

  const startLoadTimer = React.useCallback(() => {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      setMetrics(prev => ({
        ...prev,
        loadTime: endTime - startTime
      }));
    };
  }, []);

  const measureRenderTime = React.useCallback((renderFunction: () => void) => {
    const startTime = performance.now();
    renderFunction();
    const endTime = performance.now();
    setMetrics(prev => ({
      ...prev,
      renderTime: endTime - startTime
    }));
  }, []);

  // Monitor frame rate
  React.useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          frameRate: Math.round((frameCount * 1000) / (currentTime - lastTime))
        }));
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    const animationId = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return {
    metrics,
    startLoadTimer,
    measureRenderTime
  };
};
