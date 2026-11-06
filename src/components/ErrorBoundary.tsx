import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AppSplash } from './AppSplash';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <AppSplash
          error="Tivemos uma interrupção ao carregar os dados. Você pode tentar novamente ou limpar o cache local para restaurar a leitura."
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}
