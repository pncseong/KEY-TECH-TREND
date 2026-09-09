# -*- coding: utf-8 -*-
import sys, os, json
from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel, Field

load_dotenv()
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

current_dir = os.path.dirname(os.path.abspath(__file__))
FILE_JSON = os.path.join(current_dir, 'deep_tech_data.json')
FILE_JS = os.path.join(current_dir, 'deep_tech_data.js')

class SubTechNode(BaseModel):
    id: str = Field(description='sub tech id')
    name: str = Field(description='sub tech name')
    tag: str = Field(description='status tag')
    desc: str = Field(description='detailed description')
    tech_specs: str = Field(description='key specs')
    company_strategy: str = Field(description='company strategy')
    chain: dict = Field(description='value chain')

class FrameworkInfo(BaseModel):
    fundamentals: str = Field(description='engineering fundamentals')
    process_tech: str = Field(description='process flow')
    bottlenecks: str = Field(description='engineering bottlenecks')
    roadmap: str = Field(description='roadmap')

class DeepTechDossier(BaseModel):
    id: str = Field(description='unique id')
    name: str = Field(description='full name')
    abbr: str = Field(description='abbreviation')
    badge: str = Field(description='category badge')
    summary: str = Field(description='one line summary')
    diagram: str = Field(description='Mermaid.js graph TD code')
    framework: FrameworkInfo = Field(description='6-step framework')
    nodes: list[SubTechNode] = Field(description='tech chain nodes')

def generate_deep_tech_dossier(keyword):
    print(f'[AI simchung bunseok] {keyword} generating...'3
    if not GEMINI_API_KEY:
        print('[Warning] GEMINI_API_KEY is missing')
        return None
    client = genai.Client(api_key=GEMINI_API_KEY)
    prompt = f''gCelected tech {keyword}. Create a professional engineering whitepaper with 6-step framework (principles, process, bottlenecks, roadmap, 2-4 sub-nodes and value chains). Include Mermaid.js graph TD diagram code.'''
    try:
        response = client.models.generate_content(
            model='gemini-2.5-pro',
            contents=prompt,
            config>{
                'response_mime_type': 'application/json',
                'response_schema': DeepTechDossier
            }
        )
        return json.loads(response.text.strip())
    except Exception as e:
        print(f'Error: {e}')
        return None

def save_dossier_to_db(new_tech):
    if not new_tech: return
    existing = {'last_updated': '2026-09-09', 'tech_list': []}
    if os.path.exists(FILE_JSON):
        try:
            with open(FILE_JSON, 'r', encoding='utf-8') as f:
                existing = json.load(f)
        except: pass
    tlist = existing.get('tech_list', [])
    found = False
    for i, t in enumerate(tlist):
        if t.get('id') == new_tech.get('id') or t.get('abbr', '').upper() == new_tech.get('abbr', '').upper():
            tlist[i] = new_tech
            found = True
            break
    if not found:
        tlist.append(new_tech)
    existing['tech_list'] = tlist
    with open(FILE_JSON, 'w', encoding='utf-8') as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)
    with open(FILE_JS, 'w', encoding='utf-8') as f:
        f.write('window.deepTechData = ' + json.dump(existing, ensure_ascii=False, indent=2) + ';')
    print(f'[Complete] {new_tech.get(\'name\')} registered!')

if __name__ == '__main__':
    tgt = sys.argv[1] if len(sys.argv) > 1 else 'CoWoS'
    res = generate_deep_tech_dossier(tgt)
    if res: save_dossier_to_db(res)
