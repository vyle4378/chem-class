import json
import numpy as np
from openai import OpenAI
from typing import TypedDict

class Problem:
    def __init__(self, id: int, text: str, embedding: np.ndarray[float, np.dtype[np.float64]]):
        self.id = id
        self.text = text
        self.embedding = embedding


class SearchResult(TypedDict):
    problem: Problem
    simularity: float

def read_data(file: str) -> list[Problem]:
    with open(file, 'r') as f:
        data = json.load(f)
    
    output = []
    for item in data:
        cur_prob = Problem(id=item['problem_id'], text=item['text'], embedding=np.array(item['embedding'], dtype=np.float64))
        output.append(cur_prob)
    
    return output

def cosine_similarity(a, b) -> float:
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def find_top_matches(query: str, data_file: str, num_matches: int = 3) -> list[SearchResult]:
    client = OpenAI()
    embedding_response = client.embeddings.create(
        input=query,
        model='text-embedding-3-small'
    )
    query_embed = np.array(embedding_response.data[0].embedding, dtype=np.float64)

    data = read_data(data_file)
    simularities: list[SearchResult] = []
    for prob in data:
        sim = cosine_similarity(query_embed, prob.embedding)
        simularities.append({'problem': prob, 'simularity': sim})
    simularities.sort(key=lambda item: item['simularity'], reverse=True)
    
    return simularities[:num_matches]

def main() -> None:
    query = input('What do you want to search?\n')
    sims = find_top_matches(query=query, data_file='ai-search/embeddings.json', num_matches=5)
    for res in sims:
        print(f"Problem: {res['problem'].text}\nSimularity: {res['simularity']:.4f}\n\n")

if __name__ == '__main__':
    main()