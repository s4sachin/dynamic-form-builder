declare module 'lucide-react' {
  import * as React from 'react';

  export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  export const FileText: React.FC<IconProps>;
  export const InboxIcon: React.FC<IconProps>;
  export const ChevronDown: React.FC<IconProps>;
  export const ChevronUp: React.FC<IconProps>;
  export const ChevronLeft: React.FC<IconProps>;
  export const ChevronRight: React.FC<IconProps>;
  export const AlertCircle: React.FC<IconProps>;
  export const CheckCircle: React.FC<IconProps>;
  export const AlertTriangle: React.FC<IconProps>;
  export const Info: React.FC<IconProps>;
  export const X: React.FC<IconProps>;
}
