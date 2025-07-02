import React, { useState } from 'react';
import type { ResourceType } from '../domain/Resource';

type NodeType = 'topic' | 'concept' | ResourceType;

interface AddNodeFormProps<T> {
  nodeType: NodeType;
  parentId: string | null;
  onAdd: (data: Omit<T, 'id'>) => Promise<any>;
}

export default function AddNodeForm<T>({
  nodeType,
  parentId,
  onAdd,
}: AddNodeFormProps<T>) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const base: any = { parentId, orderIndex: Date.now() };

    if (nodeType === 'topic') {
      await onAdd({ ...base, subjectId: parentId, name: title });
    } else if (nodeType === 'concept') {
      await onAdd({ ...base, topicId: parentId, title });
    } else {
      await onAdd({ ...base, conceptId: parentId, type: nodeType, title });
    }
    setTitle('');
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
  <input
    placeholder={nodeType === 'topic' ? 'Topic name' : 'Title'}
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
  <button type="submit">Add {nodeType}</button>
</form>

  );
}