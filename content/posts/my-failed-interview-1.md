+++
date = '2025-01-23T12:04:23-05:00'
draft = false
title = 'Failed Interviews - 1'
+++

A record of my **failed** "leet code style" interview questions.

## The Problem

Given a 2D grid where:
- `0` represents an open cell.
- `1` represents a blocked cell.

Determine if there’s a path from the top-left corner (`[0, 0]`) to the bottom-right corner (`[n-1, m-1]`) moving only **right** or **down**. 

For example, in these grids:

```javascript
const map1 = [
    [0, 1, 0],
    [0, 0, 0],
    [0, 1, 0]
]; // Passable

const map2 = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
]; // not passable
```

---

## My Solution

The first step was to model the grid as a graph where each cell is a node, and edges exist between adjacent open cells. From there, I implemented **Breadth-First Search (BFS)** to traverse the graph and track parent nodes, which allowed me to backtrack and verify if the path was valid.

> The implementation is in TS as requested for the interview, making the solution a bit verbose.

Here’s how I approached it:

### Step 1: Build the Graph

I represented the graph as an adjacency list, where each cell is a key, and the value is an array of its accessible neighbors.

```javascript
const graph: Record<string, string[]> = {};

const maxY = map1.length
const maxX = map1[0].length 

for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
        // Initialize the graph node
        if (!graph[`${y}${x}`]) {
            graph[`${y}${x}`] = [];
        }

        // Add neighbors if they’re open

        // right check
        if (x + 1 < maxX && map1[y][x + 1] !== 1) {
            graph[`${y}${x}`].push(`${y}${x + 1}`);
        }
        // down check
        if (y + 1 < maxY && map1[y + 1][x] !== 1) {
            graph[`${y}${x}`].push(`${y + 1}${x}`);
        }
    }
}
```

The adjacency list for `map1` would look like this:

```json
// Map 1
{
    "00": ["01", "10"],
    "01": [],
    "02": [],
    "10": ["11", "20"],
    "11": ["12"],
    "12": ["22"],
    "20": [],
    "21": ["22"],
    "22": []
}
```

### Step 2: Traverse with BFS

Using BFS, I explored the graph while keeping track of visited nodes and parent-child relationships.

```javascript
const queue: string[] = [];
const visited: string[] = [];
const parents: Record<string, string> = {};

const start = '00';

queue.push(start);
visited.push(start);

while (queue.length > 0) {
    const s = queue.pop() as string;

    for (const child of graph[s]) {
        if (!visited.includes(child)) {
            queue.push(child);
            visited.push(child);
            parents[child] = s; // Record the parent
        }
    }
}
```

### Step 3: Backtrack and Check Passability

By backtracking from the end node to the start node using the `parents` map, I verified whether the path was navigable.

```javascript
const end =  `${maxY - 1}${maxX - 1}`; // Bottom-right corner
let current = end;
const path = [];

while (current !== start && parents[current]) {
    const p = parents[current];
    if (p) {
        path.unshift(p); // Add to the path
        current = p;    // Move to the parent
    }
}

const passable = current === start; // Is passable if we reached the start

console.log(`Passable: ${passable}`);
if (passable) {
    console.log(`Path: ${[...path, end].join(" -> ")}`);
}
```

---

## The Result

When I ran the solution for the given `map1`, here’s what I got:

```bash
Passable: true
Path: 00 -> 10 -> 11 -> 12 -> 22
```

and `map2`:

```bash
Passable: false
```

---

