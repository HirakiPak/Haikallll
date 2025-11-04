import React from 'react';
import { Build, ComponentType } from '../types';
import { CpuIcon, GpuIcon, MemoryStickIcon, MotherboardIcon, CaseIcon, HardDriveIcon, PowerSupplyIcon, FanIcon } from './icons';

interface AssemblyAreaProps {
  build: Build;
  onRemoveComponent: (componentType: ComponentType) => void;
}

const ComponentSlot: React.FC<{ component: any; type: ComponentType; icon: React.ReactNode; onRemove: (type: ComponentType) => void }> = ({ component, type, icon, onRemove }) => {
  const isInstalled = !!component;

  return (
    <div className={`relative border-2 border-dashed rounded-lg p-2 transition-all duration-300 ${isInstalled ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-600'}`}>
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${isInstalled ? 'text-cyan-400' : 'text-gray-500'}`}>
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-sm">{type}</h4>
          {isInstalled ? (
            <p className="text-xs text-gray-300">{component.name}</p>
          ) : (
            <p className="text-xs text-gray-500">Belum terpasang</p>
          )}
        </div>
      </div>
      {isInstalled && (
        <button onClick={() => onRemove(type)} className="absolute top-1 right-1 text-gray-500 hover:text-red-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  );
};

const AssemblyArea: React.FC<AssemblyAreaProps> = ({ build, onRemoveComponent }) => {
  return (
    <div className="flex-grow bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 flex flex-col">
      <h3 className="text-lg font-bold mb-4 text-cyan-400 border-b border-gray-700 pb-2">Rancangan PC Virtual</h3>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ComponentSlot component={build.Motherboard} type={ComponentType.Motherboard} icon={<MotherboardIcon />} onRemove={onRemoveComponent} />
        <ComponentSlot component={build.CPU} type={ComponentType.CPU} icon={<CpuIcon />} onRemove={onRemoveComponent} />
        <ComponentSlot component={build.RAM} type={ComponentType.RAM} icon={<MemoryStickIcon />} onRemove={onRemoveComponent} />
        <ComponentSlot component={build.GPU} type={ComponentType.GPU} icon={<GpuIcon />} onRemove={onRemoveComponent} />
        <ComponentSlot component={build.Storage} type={ComponentType.Storage} icon={<HardDriveIcon />} onRemove={onRemoveComponent} />
        <ComponentSlot component={build.PSU} type={ComponentType.PSU} icon={<PowerSupplyIcon />} onRemove={onRemoveComponent} />
        <ComponentSlot component={build.Cooler} type={ComponentType.Cooler} icon={<FanIcon />} onRemove={onRemoveComponent} />
        <ComponentSlot component={build.Case} type={ComponentType.Case} icon={<CaseIcon />} onRemove={onRemoveComponent} />
      </div>
    </div>
  );
};

export default AssemblyArea;