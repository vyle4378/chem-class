from openai import OpenAI
import json

def read_problems(file: str) -> list[str]:
    all_data = []
    try:
        with open(file) as f:
            cur_prob = ''
            for line in f:
                line = line.strip()
                if line:
                    cur_prob += line + '\n'
                else:
                    if cur_prob.strip():
                        all_data.append(cur_prob.strip())
                    cur_prob = ''
            
            # take care of last problem
            if cur_prob.strip():
                all_data.append(cur_prob.strip())
            
        return all_data
        
    except FileNotFoundError:
        print(f"Error: File '{file}' not found.")
        return []
    except Exception as e:
        print(f"Error reading file: {e}")
        return []

def embed_problems(probs: list[str], file: str) -> None:
    client = OpenAI()
    response = client.embeddings.create(
        input=probs,
        model="text-embedding-3-small"
    )

    out_list = []
    for i, em in enumerate(response.data):
        problem = {
            "problem_id": i,
            "text": probs[i],
            "embedding": em.embedding
        }
        out_list.append(problem)

    with open(file, 'w') as f:
        json.dump(out_list, f)

def main():
    data = read_problems('ai-search/problems.txt')
    embed_problems(data, 'ai-search/embeddings.json')


if __name__ == "__main__":
    main()