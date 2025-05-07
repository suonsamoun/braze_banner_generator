import React from 'react';
import '../styles/ActionButtons.css';

interface Action {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  className: string;
  disabled?: boolean;
}

interface ActionButtonsProps {
  actions: Action[];
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ actions }) => {
  return (
    <div className="action-buttons">
      {actions.map((action, index) => (
        <button
          key={index}
          className={`btn ${action.className}`}
          onClick={action.onClick}
          disabled={action.disabled}
        >
          <span className="btn-icon">{action.icon}</span>
          <span className="btn-text">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;