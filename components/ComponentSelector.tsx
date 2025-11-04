import React, { useMemo, useState } from 'react';
import { Component, ComponentType, Build } from '../types';

interface ComponentSelectorProps {
  allComponents: Component[];
  selectedBuild: Build;
  onSelectComponent: (component: Component) => void;
}

const ComponentSelector: React.FC<ComponentSelectorProps> = ({ allComponents, selectedBuild, onSelectComponent }) => {
  const [expandedCategory, setExpandedCategory] = useState<ComponentType | null>(ComponentType.Motherboard);

  const componentsByCategory = useMemo(() => {
    return allComponents.reduce((acc, component) => {
      if (!acc[component.type]) {
        acc[component.type] = [];
      }
      acc[component.type].push(component);
      return acc;
    }, {} as { [key in ComponentType]: Component[] });
  }, [allComponents]);
  
  const toggleCategory = (category: ComponentType) => {
    setExpandedCategory(prev => prev === category ? null : category);
  };

  return (
    <div className="w-full lg:w-1/3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 flex flex-col max-h-[85vh]">
      <h3 className="text-lg font-bold mb-4 text-cyan-400 border-b border-gray-700 pb-2">Pustaka Komponen</h3>
      <div className="overflow-y-auto space-y-2">
        {Object.entries(componentsByCategory).map(([category, components]) => (
          <div key={category} className="bg-gray-900/50 rounded-lg">
            <button
              onClick={() => toggleCategory(category as ComponentType)}
              className="w-full text-left p-3 font-semibold flex justify-between items-center hover:bg-gray-700/50"
            >
              <span>{category}</span>
              <svg className={`w-5 h-5 transition-transform ${expandedCategory === category ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {expandedCategory === category && (
              <div className="p-2 space-y-2 border-t border-gray-700">
                {/* FIX: Cast `components` to `Component[]` to resolve TypeScript error. */}
                {(components as Component[]).map(component => {
                  const isSelected = selectedBuild[component.type]?.id === component.id;
                  return (
                    <div
                      key={component.id}
                      onClick={() => onSelectComponent(component)}
                      className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-all duration-200 ${
                        isSelected ? 'bg-cyan-500/20 ring-2 ring-cyan-500' : 'hover:bg-gray-700'
                      }`}
                    >
                      <img src={component.imageUrl} alt={component.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="font-bold text-sm">{component.name}</p>
                        <p className="text-xs text-gray-400">{component.brand}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentSelector;